import Taro from '@tarojs/taro'
import { View, MovableArea, MovableView, Image } from '@tarojs/components';
import './index.scss'

interface IProps {
  imageList: Array<any>;
  onSliderEnd?: (index: number) => void;
}
const ActionType = {
  LeftSlide:'LeftSlide',//左滑
  RightSlide:'RightSlide',//右滑
}
const ImageSlider: Taro.FC<IProps> = ({
  imageList = [],
  onSliderEnd
}) => {

  const [currentIndex,setCurrentIndex] = Taro.useState(0)
  const [list,setList]: any = Taro.useState([])
  
  Taro.useEffect(()=> {
    setList(imageList)
  },[imageList])

  const { windowWidth, pixelRatio } = Taro.getSystemInfoSync()
  let originX = 0,
      originY = 0,
      movableAreaHeight = 900 / pixelRatio,
      movableAreaWidth = 600 / pixelRatio,
      length = imageList.length;

  const todo = (actionType: string) => {
    // console.log('todo',currentIndex)
    let sliderItem = list[currentIndex]
    if( !sliderItem )return
    switch (actionType) {
        case ActionType.LeftSlide:
            sliderItem.x = -windowWidth;
        break;
        case ActionType.RightSlide:
            sliderItem.x = windowWidth;
        break;
    }
    const newList = [...list]
    setList(newList)
    setCurrentIndex(currentIndex+1)
  }

  const reset = (item: any) => {
    item.x = -1
    item.y = 0
    item.disabled = false
    let newList = [...list]
    setList(newList)
    setTimeout(() => {
      item.x = 0
      newList = [...list]
      setList(newList)
    }, 100);
    
  }

  const onTouchCancel = (e: any)=> {
    onTouchEnd(e)
  }

  const onTouchEnd = (e: any)=> {
    let dx = (e.changedTouches[0].pageX - originX)
    let dy = (e.changedTouches[0].pageY - originY)
    let fx4 = movableAreaWidth/4
    let fx6 = movableAreaWidth/6
    let fy8  = movableAreaHeight/8
    if(currentIndex >= length) {
      return
    }
    
    let item = list[currentIndex]
    if(Math.abs(dy)>fy8){
        if( dx < -fx6 ){//左下或者左上
          todo(ActionType.LeftSlide)
        }else if( dx>fx6 ){//右下或者右上
          todo(ActionType.RightSlide)
        }else{//恢复
          reset(item)
        }
    }else{
        if( dx < - fx4){
          todo(ActionType.LeftSlide)
        }
        else if( dx > fx4){
          todo(ActionType.RightSlide)
        }else{
          reset(item)
        }
    }
    if(currentIndex === length-1){
      onSliderEnd && onSliderEnd(currentIndex)
      setCurrentIndex(0)
    }
  }

  const onTouchStart = (e: any)=> {
    if(e&&e.changedTouches&&e.changedTouches.length>0){
      originX = e.changedTouches[0].pageX
      originY = e.changedTouches[0].pageY

      // console.log(`onTouchStart -> originX=${originX} originY=${originY}`)
    }
  }

  const onTouchMove = (e: any)=> {
    // let dx = (e.changedTouches[0].pageX - originX)
  }
  return (
    <View className='slider'>
      <MovableArea className='slider-area'>
        {
          list && list.map((item: any,index: number) => {
            const disabled = index !== currentIndex 
            return (
              <MovableView 
                key='id'
                direction='all'
                damping={50}
                friction={10}
                inertia={false}
                outOfBounds={true}
                className='slider-view'
                onTouchCancel={onTouchCancel}
                onTouchEnd={onTouchEnd}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                disabled={disabled}
                style={`z-index:${list.length - index}`}
                x={item.x}
                y={item.y}
              >
                <View className='slider-item'>
                  <Image className="slider-item__img" src={item.url} mode='aspectFill' lazyLoad ></Image>
                </View>
              </MovableView>
            )
          })
        }
      </MovableArea>
    </View>
  )
}

export default Taro.memo(ImageSlider)