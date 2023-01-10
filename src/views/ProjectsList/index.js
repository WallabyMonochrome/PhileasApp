import React from "react";
import ProjectPolygon from "views/ProjectsList/ProjectPolygon";
import {ReactComponent as PolygonDecorator} from "asset/Polygon_decorator.svg";
import style from "./style.module.scss";

export default () => {
    return (
        <React.Fragment>
            <div className={style.listing}>
                <ProjectPolygon>
                    <div className={`${style.content} ${style.contentBase}`}>
                        <h2>Project 1</h2>
                        <div className={style.decoratorStyle}>
                            <PolygonDecorator></PolygonDecorator>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </ProjectPolygon>
                <ProjectPolygon variantFilled={true}>
                    <div className={`${style.content}`}>
                        <h2>Photo</h2>
                    </div>
                </ProjectPolygon>
                <ProjectPolygon>
                <div className={`${style.content} ${style.contentBase}`}>
                    <h2>Project 2</h2>
                    <div className={style.decoratorStyle}>
                        <PolygonDecorator></PolygonDecorator>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </ProjectPolygon>
                <ProjectPolygon variantFilled={true}>
                    <div className={`${style.content}`}>
                        <h2>Photo</h2>
                    </div>
                </ProjectPolygon>
                <ProjectPolygon>
                <div className={`${style.content} ${style.contentBase}`}>
                    <h2>Project 3</h2>
                    <div className={style.decoratorStyle}>
                        <PolygonDecorator></PolygonDecorator>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </ProjectPolygon>
                <ProjectPolygon variantFilled={true}>
                    <div className={`${style.content}`}>
                        <h2>Photo</h2>
                    </div>
                </ProjectPolygon>
            </div>

        </React.Fragment>)
}