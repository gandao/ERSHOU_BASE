import Mock from 'mockjs'
let index_data = {
    "SlideShow": {
        "ImageUrl|1-1": ["https://y.gtimg.cn/music/common/upload/t_focus_info_iphone/210583.jpg","https://y.gtimg.cn/music/common/upload/t_focus_info_iphone/210583.jpg","https://y.gtimg.cn/music/common/upload/t_focus_info_iphone/208890.jpg"]
    },
    "User": {
        "IsLogIn|1": false, 
        "userimage|1": ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510403199066&di=0de5d7abf749a5c4340041394af52e78&imgtype=0&src=http%3A%2F%2Fimg.dongqiudi.com%2Fuploads%2Favatar%2F2015%2F07%2F25%2FQM387nh7As_thumb_1437790672318.jpg","https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1510403248213&di=77fe218a9b951472a6d1472bce6601b7&imgtype=0&src=http%3A%2F%2Fuserimg.yingyonghui.com%2Fhead%2F47%2F1464792142961%2F2536747.png-thumb"],
        "UserName": "@name"
    },
    "ShopList": {
        "Count|8-10": 1
    }
}

Mock.mock('http://index', index_data)
Mock.mock('http://main', {
    
    'name': '@name',
    
    'age|1-100': 100,
    
    'color': '@color'
    
})
export default Mock
