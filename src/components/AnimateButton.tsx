// 动画按钮
import { forwardRef, ReactElement } from "react";

// 一个第三方动画组件库
import { motion, useCycle } from "framer-motion"

interface scaleObject {
    hover:number,
    tap:number
}

interface AnimateButtonProps {
    children?: ReactElement | null,
    type: 'slide' | 'scale' | 'rotate',
    direction: 'up' | 'down' | 'left' | 'right',
    offset: number,
    scale: number | scaleObject
}

export const defaultProps:AnimateButtonProps ={
    type:'scale',
    offset:10,
    direction:'right',
    scale:{
        hover:1,
        tap:0.9
    }
}

const AnimateButton = forwardRef(
    ({ children, type, direction, offset, scale }:AnimateButtonProps,
     ref) => {
     let offset1;
     let offset2;
     switch (direction) {
         case 'up':
         case 'left':
             offset1 = offset;
             offset2 = 0;
             break;
         case 'right':
         case 'down':
         default:
             offset1 = 0;
             offset2 = offset;
             break;
     }
    // 参考链接：https://www.framer.com/docs/utilities/
     const [x, cycleX] = useCycle(offset1, offset2);
     const [y, cycleY] = useCycle(offset1, offset2);

     switch (type) {
            case 'rotate':
                return (
                    //@ts-ignore
                    <motion.div ref={ref}
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 2,
                            repeatDelay: 0
                        }}
                    >
                        {children}
                    </motion.div>
                );
            case 'slide':
                if (direction === 'up' || direction === 'down') {
                    return (
                        //@ts-ignore
                        <motion.div ref={ref}
                            animate={{ y: y !== undefined ? y : '' }}
                            onHoverEnd={() => cycleY()}
                            onHoverStart={() => cycleY()}
                        >
                            {children}
                        </motion.div>
                    );
                }
                return (
                    //@ts-ignore
                    <motion.div ref={ref} animate={{ x: x !== undefined ? x : '' }} onHoverEnd={() => cycleX()} onHoverStart={() => cycleX()}>
                        {children}
                    </motion.div>
                );
            case 'scale':
            default:
                if (typeof scale === 'number') {
                    scale = {
                        hover: scale,
                        tap: scale
                    };
                }
                return (
                    //@ts-ignore
                    <motion.div ref={ref}
                                whileHover={{ scale: scale?.hover }}
                                whileTap={{ scale: scale?.tap }}>
                        {children}
                    </motion.div>
                );
        }
});

export default AnimateButton;