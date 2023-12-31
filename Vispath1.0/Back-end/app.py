import shapefile
import pyproj
import shapely.geometry
from shapely.ops import transform
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
from shapely.geometry import shape, mapping
import geojson
import json

app = Flask(__name__)
app.debug = True
CORS(app)

#定义映射
value_mapping = {
    "0-1": "徒步",
    "0-2": "登山",
    "0-3": "骑行",
    "1-1": "今天",
    "1-2": "明天",
    "1-3": "后天",
}
jingguan_mapping = {
    "ziran": "景观类型-自然",
    "renwen": "景观类型-人文"
}
demand_mapping = {
    "challenge": '挑战性',
    "hot": '热门程度',
    "fundamental": '服务设施完善程度',
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
        print(request.data)
    # 从data中提取值
    link_option = jingguan_mapping.get(data['setlandscape_type'], data['setlandscape_type'])
    link_cls = int(data['setlandscape_compact'])
    link_sep = int(data['setlandscape_loose'])
    link_option2 = demand_mapping.get(data['setdemand_type'], data['setdemand_type'])
    link_cls2 = int(data['setdemand_compact'])
    link_sep2 = int(data['setdemand_loose'])
    out_day = value_mapping.get(data['settrip_time'], data['settrip_time'])
    out_way = value_mapping.get(data['settrip_type'], data['settrip_type'])
    like_length = (data['setpath_min'], data['setpath_max'])
    weight_hot = int(data['setpath_hot'])
    weight_serve = int(data['setpath_service'])
    weight_dem = int(data['setpath_challenge'])
    weight_weather = int(data['setpath_weather'])
    # 检查值是否被正确传入
    print("link_option:", link_option)
    print("link_cls:", link_cls)
    print("link_sep:", link_sep)
    print("link_option2:", link_option2)
    print("link_cls2:", link_cls2)
    print("link_sep2:", link_sep2)
    print("out_day:", out_day)
    print("out_way:", out_way)
    print("like_length:", like_length)
    print("weight_hot:", weight_hot)
    print("weight_serve:", weight_serve)
    print("weight_dem:", weight_dem)
    print("weight_weather:", weight_weather)

    try:
        prop_lst, geom_lst, geojson_geom_list_transformed = con(link_option, link_cls, link_sep, link_option2, link_cls2, link_sep2, out_day, out_way, like_length, weight_hot, weight_serve, weight_dem, weight_weather)
        # 处理成功，返回geojson 数据
        return jsonify({'success': True, 'data': geojson_geom_list_transformed})
    except Exception as e:
        # 如果出现异常，返回错误消息
        return jsonify({'success': False, 'error': str(e)}), 500

#坐标系转换函数
def transform_coordinates(geojson_obj, source_crs, target_crs="EPSG:4326"):
    project = pyproj.Transformer.from_crs(source_crs, target_crs, always_xy=True).transform

    def transform_feature_geometry(feature):
        geom = shape(feature["geometry"])
        transformed_geom = transform(project, geom)
        feature["geometry"] = mapping(transformed_geom)
        return feature

    transformed_features = [transform_feature_geometry(feature) for feature in geojson_obj["features"]]
    geojson_obj["features"] = transformed_features

    return geojson_obj

#主函数
def con(link_option, link_cls, link_sep, link_option2, link_cls2, link_sep2, out_day, out_way, like_length, weight_hot, weight_serve, weight_dem, weight_weather):
    ## 读取文件
    filepath = 'workingdata5/' + out_way + '.shp'
    fi = shapefile.Reader(filepath)
    records = pd.DataFrame(fi.records(),columns=[i[0] for i in fi.fields[1:]])  # 用于加权计算
    geoms = fi.shapes()  # 地理信息
    fi.close()
    filepath2 = 'workingdata5/' + out_way + '.npy'
    adjacent = np.load(filepath2, allow_pickle=True).item()

    ## 要素阈值与距离阈值
    # 连结要素
    link_dict = {'热门程度':'hot','服务设施完善程度':'serve','景观类型-人文':'scene_h','景观类型-自然':'scene_n','挑战性':'dem'}
    link_field = link_dict.get(jingguan_mapping.get(link_option, link_option))
    link_tol_cls = 12 - link_cls  # 连接要素-距离阈值
    link_tol_sep = 11 - link_sep
    link_tol_sep_on = True

    link_field2_on = True
    link_field2 = link_dict[link_option2]
    link_tol2_cls = 12 - link_cls2
    link_tol2_sep = 11 - link_sep2
    link_tol2_sep_on = True
    # 筛选要素
    datetime = {'今天':'0','明天':'1','后天':'2'}  # 筛选要素-要素阈值
    like_short, like_long = like_length
    like_short = int(like_short)
    like_long = int(like_long)
    ## 要素二值化
    # 连结要素
    records['link'] = records[link_field]
    records['link2'] = records[link_field2]
    # 筛选要素
    records['choose_weather'] = records['weather'+datetime[out_day]]
    records['choose_length'] = records['SHAPE_Leng']
    # 评价要素
    records['star'] = records['hot']*weight_hot + records['serve']*weight_serve + records['dem']*weight_dem + records['weather'+datetime[out_day]]*weight_weather

    ## 拼接
    rank = 0
    geom_lst = []
    prop_lst = []
    nodes_set = set()  # 是否已遍历

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
        scaled_values = [rank, star * 100, total_length] + [e * 100 for e in element_lst]
        prop_lst.append(scaled_values)  # 信息
        rank += 1
    #排序  
    prop_lst = pd.DataFrame(prop_lst,columns=['rank','综合评分','总长度','热门程度','服务设施完善程度','挑战性','气候状况'])  
    prop_lst['rank'] = prop_lst['综合评分'].rank(ascending=False, method='min').astype(int)

    def convert_to_geojson(geom_lst, prop_lst):
        features = []
        for geom, prop in zip(geom_lst, prop_lst):
            geojson_geom = mapping(geom)  # 将shapely转换成geojson
            properties = {key: str(value) for key, value in prop.items()}  # 将properties转换成string
            features.append(geojson.Feature(geometry=geojson_geom, properties=properties))
        return geojson.FeatureCollection(features)

    geojson_geom_list = convert_to_geojson(geom_lst, prop_lst.to_dict(orient="records"))

    source_crs = "32650"  # 当前的坐标系统的EPSG代码 UTM Zone 50N
    geojson_geom_list_transformed = transform_coordinates(geojson_geom_list, source_crs)
    
    print(type(geojson_geom_list_transformed))
    return prop_lst, geom_lst, geojson_geom_list_transformed


# 运行应用
if __name__ == '__main__':
    app.run(debug=True, port=5000)