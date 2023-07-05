
interface Props {
    filled: number,
}

 const StatusBar:React.FC<Props> = ({filled})=>{


    let ratio = filled > 0 ? filled/4 : 0;
    ratio = ratio*100;
    let bgcolor;
    const width = ratio + '%';
    if(ratio === 25){
        bgcolor = 'red';
    }
    else if(ratio === 50){
        bgcolor = 'linear-gradient(to right, #ff0000 0%, #ffcc00 100%)';
    }
    else if(ratio === 75){
        bgcolor = 'linear-gradient(to right, #ff0000 0%, #99ff99 100%)';
    }
    else if(ratio === 100){
        bgcolor = 'linear-gradient(to right, #ff6666 0%, #00ff00 100%)';
    }

    return( 
        <div className=' fixed h-4 rounded-xl w-60 bg-pink-200 top-4 left-6'>
                <div className='rounded-lg h-full   transition' style={{width: width, background:bgcolor}}></div>
        </div>
    )
}

export default StatusBar;