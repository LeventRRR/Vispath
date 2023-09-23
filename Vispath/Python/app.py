import shapefile
from shapely.geometry import MultiLineString
import numpy as np
import pandas as pd
from anytree import AnyNode
from anytree.search import findall_by_attr

import matplotlib.pyplot as plt
import cartopy
import cartopy.io.shapereader as shpreader
import cartopy.crs as ccrs

from flask import Flask, request, jsonify
from flask_cors import CORS
from shapely.geometry import mapping
import geojson

app = Flask(__name__)
app.debug = True
CORS(app)

#定义映射
value_mapping = {
    "0-1": "徒步",
    "0-2": "登山",
    "0-3": "骑行",
    "1-1": "0",
    "1-2": "1",
    "1-3": "2",
}
jingguan_mapping = {
    "ziran": "scene_n",
    "renwen": "scene_h"
}
# 定义一个接口来处理请求
@app.route('/data', methods=['get'])
def data():
    # 获取前端传递的参数
    data = request.args
    if not data:
        return jsonify({'error': 'Invalid data'}), 400
    #检查传入的参数和值
    for key, value in data.items():
        print(f"{key} = {value}")

    # 从data中提取值
    link_option = data.get('setlandscape_type')
    link_cls = data.get('setlandscape_compact')
    link_sep = data.get('setlandscape_loose')
    link_option2 = data.get('setdemand_type')
    link_cls2 = data.get('setdemand_compact')
    link_sep2 = data.get('setdemand_loose')
    out_day = data.get('settrip_time')
    out_way = data.get('settrip_type')
    like_length = (data.get('setpath_min'), data.get('setpath_max'))
    weight_hot = data.get('setpath_hot')
    weight_serve = data.get('setpath_service')
    weight_dem = data.get('setpath_challenge')
    weight_weather = data.get('setpath_weather')
    
    prop_lst, geom_lst, geojson_geom_list = con(link_option, link_cls, link_sep, link_option2, link_cls2, link_sep2, out_day, out_way, like_length, weight_hot, weight_serve, weight_dem, weight_weather)
    return jsonify(geojson_geom_list)  


def con(link_option, link_cls, link_sep, link_option2, link_cls2, link_sep2, out_day, out_way, like_length, weight_hot, weight_serve, weight_dem, weight_weather):
    
    ## 读取文件
    out_way_mapped = value_mapping.get(out_way, out_way)
    print("Mapped out_way:", out_way_mapped)
    fi = shapefile.Reader(f'workingdata5/{out_way_mapped}.shp')
    records = pd.DataFrame(fi.records(),columns=[i[0] for i in fi.fields[1:]])  # 用于加权计算
    geoms = fi.shapes()  # 地理信息
    fi.close()
    adjacent = np.load(f'workingdata5/{out_way_mapped}.npy',allow_pickle=True).item()

    ## 要素阈值与距离阈值
    # 连结要素
    link_dict = {'热门程度':'hot','服务设施完善程度':'serve','景观类型-人文':'scene_h','景观类型-自然':'scene_n','挑战性':'dem'}
    link_field = link_dict.get(jingguan_mapping.get(link_option, link_option))
    link_tol_cls = 12 - link_cls.value  # 连接要素-距离阈值
    link_tol_sep = 11 - link_sep.value
    link_tol_sep_on = True

    link_field2_on = True
    link_field2 = link_dict[link_option2.value]
    link_tol2_cls = 12 - link_cls2.value
    link_tol2_sep = 11 - link_sep2.value
    link_tol2_sep_on = True
    # 筛选要素
    datetime = {'今天':'0','明天':'1','后天':'2'}  # 筛选要素-要素阈值
    like_short, like_long = like_length.value

    ## 要素二值化
    # 连结要素
    records['link'] = records[link_field]
    records['link2'] = records[link_field2]
    # 筛选要素
    records['choose_weather'] = records['weather'+datetime[out_day.value]]
    records['choose_length'] = records['SHAPE_Leng']
    # 评价要素
    records['star'] = records['hot']*weight_hot.value + records['serve']*weight_serve.value + records['dem']*weight_dem.value + records['weather'+datetime[out_day.value]]*weight_weather.value

    ## 拼接
    rank = 0
    geom_lst = []
    prop_lst = []
    nodes_set = set()  # 是否已遍历
    if link_field2_on:
        # 索引结构
        for root_idx in np.where((records['link'] == 1))[0]:
            if root_idx in nodes_set:  # 若已遍历则跳过
                continue
            root = AnyNode(name=str(root_idx) + "_0_0")
            cdts = [root]

            while len(cdts) > 0:
                current_node_idx = int(cdts[0].name.split("_")[0])  # 当前小节索引
                adjacent_lines_idx = adjacent[current_node_idx]  # 临近小节索引-列表
                nodes_set.add(current_node_idx)  # 路线小节索引-组
                # 判断小节可行性
                for adjacent_line_idx in adjacent_lines_idx:
                    # 判断要素阈值可行性
                    flag = int(records.loc[adjacent_line_idx, 'link'])
                    flag2 = int(records.loc[adjacent_line_idx, 'link2'])
                    node_name = "%d_%d_%d" % (adjacent_line_idx, flag, flag2)
                    # 构建路线列表
                    current_path_cls = sum([int(node.name.split("_")[1]) for node in list(cdts[0].iter_path_reverse())[:link_tol_cls]]) + int(flag)
                    current_path_sep = sum([int(node.name.split("_")[1]) for node in list(cdts[0].iter_path_reverse())[:link_tol_sep]]) + int(flag)
                    current_path2_cls = sum([int(node.name.split("_")[2]) for node in list(cdts[0].iter_path_reverse())[:link_tol2_cls]]) + int(flag2)
                    current_path2_sep = sum([int(node.name.split("_")[2]) for node in list(cdts[0].iter_path_reverse())[:link_tol2_sep]]) + int(flag2)                    # 判断距离阈值可行性：测度当前不符合条件连续小节数
                    if len(list(findall_by_attr(root, node_name))) < 1 \
                            and current_path_cls > 0 \
                            and (not link_tol_sep_on or current_path_sep < link_tol_sep)\
                            and current_path2_cls > 0 \
                            and (not link_tol2_sep_on or current_path2_sep < link_tol2_sep)\
                            and adjacent_line_idx not in nodes_set:
                        adjacent_line = AnyNode(name=node_name, parent=cdts[0])
                        nodes_set.add(adjacent_line_idx)
                        cdts.append(adjacent_line)
                # 筛选要素筛选
                if len(cdts) > like_long*20 or records.loc[current_node_idx,'choose_weather'] == 0:
                    break
                del cdts[0]

            nodes = set()
            dfs_paths = [leaf.iter_path_reverse() for leaf in root.leaves]
            for path in dfs_paths:
                flag = False
                for node in path:
                    if node.name.split("_")[1] == "1" or (link_field2_on and node.name.split("_")[2] == "1"):
                        flag = True
                    if flag:
                        nodes.add(node)

            # 筛选要素筛选
            total_length = sum([records.loc[int(node.name.split("_")[0]),'choose_length'] for node in list(nodes)])
            if total_length < like_short*1000:
                continue

            # 评分信息计算
            total_star = sum([records.loc[int(node.name.split("_")[0]),'star'] for node in list(nodes)])
            star = round(total_star / total_length,3)
            # 其他信息计算
            total_element_lst = sum([records.loc[int(node.name.split("_")[0]),['hot','serve','dem','choose_weather']] for node in list(nodes)])
            element_lst = [round(total_element / total_length,3) for total_element in total_element_lst]

            # 路线/信息写入列表
            geom_lst.append(MultiLineString([geoms[int(node.name.split("_")[0])].points for node in list(nodes)]))  # 路线
            prop_lst.append([rank, star, total_length]+element_lst)  # 信息
            rank += 1
    else:
        # 索引结构
        for root_idx in np.where((records['link'] == 1))[0]:
            if root_idx in nodes_set:  # 若已遍历则跳过
                continue
            root = AnyNode(name=str(root_idx) + "_0")
            cdts = [root]

            while len(cdts) > 0:
                current_node_idx = int(cdts[0].name.split("_")[0])  # 当前小节索引
                adjacent_lines_idx = adjacent[current_node_idx]  # 临近小节索引-列表
                nodes_set.add(current_node_idx)  # 路线小节索引-组
                # 判断小节可行性
                for adjacent_line_idx in adjacent_lines_idx:
                    # 判断要素阈值可行性
                    flag = int(records.loc[adjacent_line_idx, 'link'])
                    node_name = "%d_%d" % (adjacent_line_idx, flag)
                    # 构建路线列表
                    current_path_cls = sum([int(node.name.split("_")[1]) for node in list(cdts[0].iter_path_reverse())[:link_tol_cls]]) + int(flag)
                    current_path_sep = sum([int(node.name.split("_")[1]) for node in list(cdts[0].iter_path_reverse())[:link_tol_sep]]) + int(flag)
                    # 判断距离阈值可行性：测度当前不符合条件连续小节数
                    if len(list(findall_by_attr(root, node_name))) < 1 \
                            and current_path_cls > 0 \
                            and (not link_tol_sep_on or current_path_sep < link_tol_sep)\
                            and adjacent_line_idx not in nodes_set:
                        adjacent_line = AnyNode(name=node_name, parent=cdts[0])
                        nodes_set.add(adjacent_line_idx)
                        cdts.append(adjacent_line)
                # 筛选要素筛选
                if len(cdts) > like_long*20 or records.loc[current_node_idx,'choose_weather'] == 0:
                    break
                del cdts[0]

            nodes = set()
            dfs_paths = [leaf.iter_path_reverse() for leaf in root.leaves]
            for path in dfs_paths:
                flag = False
                for node in path:
                    if node.name.split("_")[1] == "1":
                        flag = True
                    if flag:
                        nodes.add(node)

            # 筛选要素筛选
            total_length = sum([records.loc[int(node.name.split("_")[0]),'choose_length'] for node in list(nodes)])
            if total_length < like_short*1000:
                continue

            # 评分信息计算
            total_star = sum([records.loc[int(node.name.split("_")[0]),'star'] for node in list(nodes)])
            star = round(total_star / total_length,3)
            # 其他信息计算
            total_element_lst = sum([records.loc[int(node.name.split("_")[0]),['hot','serve','dem','choose_weather']] for node in list(nodes)])
            element_lst = [round(total_element / total_length,3) for total_element in total_element_lst]

            # 路线/信息写入列表
            geom_lst.append(MultiLineString([geoms[int(node.name.split("_")[0])].points for node in list(nodes)]))  # 路线
            prop_lst.append([rank, star, total_length]+element_lst)  # 信息
            rank += 1

    prop_lst = pd.DataFrame(prop_lst,columns=['rank','综合评分','总长度','热门程度','服务设施完善程度','挑战性','气候状况'])  # 简单排序
    def convert_to_geojson(geom_lst):
        features = []
        for geom in geom_lst:
            geojson_geom = mapping(geom)  # Convert shapely object to geojson
            features.append(geojson.Feature(geometry=geojson_geom))
        return geojson.FeatureCollection(features)

    geojson_geom_list = convert_to_geojson(geom_lst)
    
    return prop_lst, geom_lst, geojson_geom_list


# 运行应用
if __name__ == '__main__':
    app.run(debug=True, port=5000)