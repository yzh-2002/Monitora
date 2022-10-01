// material-ui
import { LinearProgress, styled} from "@mui/material";

// styled(Component, [options])(styles) => Component
const LoaderWrapper =styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1301,
    width: '100%'
})

// 过渡组件
export const Loader =()=>{
    return (
        <LoaderWrapper>
            <LinearProgress color="primary"></LinearProgress>
        </LoaderWrapper>
    )
}