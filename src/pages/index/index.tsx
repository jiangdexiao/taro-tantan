import Taro, { Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { IBaseProps } from '@/models/connect'
import { JdxImageSlider } from '@/components/'
import { __debounce } from '@/utils/';
import './index.scss'

interface IState {
  imageList: Array<any>;
}
@connect(({ app }) => ({
  ...app
}))
export default class Index extends Taro.PureComponent<IBaseProps,IState> {

  config: Config = {
    disableScroll:true,
    navigationBarTitleText: '左滑右滑'
  }

  constructor(props: any){
    super(props)
    this.state = {
      imageList: []
    }
  }

  componentWillMount(){
    this.init()
  }

  async init(){
    const res =  await this.props.dispatch({
      type: 'app/getImageList'
    })
    const { success, data } = res||{}
    if(success){
      this.setState({
        imageList: data.map(p=> {
          return {
            ...p,
            x: 0,
            y: 0,
            disabled: false
          }
        })
      })
    }
  }
  
  onSliderEnd(index: number){
    console.log('onSliderEnd load next page data',index)
    this.setState({
      imageList:[]
    },()=>{
      this.init()
    })
  }

  render(){
    const {  imageList=[] } = this.state
    return (
      <JdxImageSlider imageList={imageList} onSliderEnd={this.onSliderEnd.bind(this)} />
    );
  }
}

