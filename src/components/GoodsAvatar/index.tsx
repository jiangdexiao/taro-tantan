/**
 * 商品主图
 */
import Taro from '@tarojs/taro'
import { Image } from '@tarojs/components';
import icon from '@/assets/images/logo.png'
import './index.scss'

interface IPros {
  src?:string;
}
interface IState {
  isError:boolean;
}
export default class GoodsAvatar extends Taro.PureComponent<IPros,IState>{
  static externalClasses = ['small','middle','big-avatar']
  constructor(){
    super(...arguments)
    this.state = {
      isError:false
    }
  }

  render(){
    const { isError } = this.state
    const { src } = this.props
    return (
      <Image className='default small middle big-avatar'
        mode='scaleToFill'
        lazy-load 
        src={isError?icon:(src||icon)} 
        onError={
          ()=> this.setState({ isError:true })
        } 
      />
    )
  }
}
