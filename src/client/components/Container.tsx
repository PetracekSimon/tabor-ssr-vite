import React, { PropsWithChildren } from "react";
import "./container.css";

interface ContainerProps {

}

const Container = (props: PropsWithChildren<ContainerProps>) => {
    return <div className="container px-4">
        {props.children}
    </div>
}

export default Container;