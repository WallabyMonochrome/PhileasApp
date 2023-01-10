import React from "react";
import {ReactComponent as Polygon} from "asset/Polygon_white.svg";
import {ReactComponent as PolygonFilled} from "asset/Polygon_filled.svg";
import style from "./style.module.scss";

export default (props) => {
    return (
        <React.Fragment>
            <div className={`${style.polygonStyle} ${props.variantFilled ? style.filled: style.base}`}>
            <Polygon></Polygon>
                <div className={style.polygonContent}>
                    {props.children}
                </div>

            </div>
        </React.Fragment>
    );
}