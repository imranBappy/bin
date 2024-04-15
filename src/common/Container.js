import _Container from '@mui/material/Container';

const Container = ({ children, maxWidth="lg"}) =>{

    return(
        <_Container
            // maxWidth={{
            //     // xl:'xl',
            //     lg:'lg',
            //     md:'md',
            //     sm:'sm',
            //     xs:'xs'
            // }}
            maxWidth={maxWidth}
        >
            {
                children
            }
        </_Container>
    )

}

export default Container;