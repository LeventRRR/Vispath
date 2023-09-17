
from flask import Flask
import json
app = Flask(__name__)

# 定义一个接口来处理请求
@app.route('/data', methods=['GET'])
def getPose():
    sendinfo = {
        'message': {
            'the_pose': {
                'theta': "203.315841",
                'x': "19.909973",
                'y': "9.336903",
                'z': "0"}
        },
        "topic": "the_pose"}
    return json.dumps(sendinfo)



# 运行应用
if __name__ == '__main__':
    app.run(debug=True, port=5000)