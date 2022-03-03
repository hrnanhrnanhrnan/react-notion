import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

export const GetDataComponent = (props) => {
    //Gets data from the parent GetDataContainer through props 
    //and then uses that data to display it to the screen when it is mounted
    return (
        <div className="App container-fluid bg-dark text-white">
            {
                props.loadingParam ? (
                    <>
                        <div className="spinner-border text-muted">
                        </div>
                        <p>{props.errorParam}</p>
                    </>
                ) : (
                    <div>
                    <h1 className="display-6">Projects</h1>
                    <ul>
                        {
                            props.dataParam.results.map((row, idx) => (
                                <li className="pt-3" id={idx}>{row.properties.Projectname.title[0].text.content}
                                    <ul>
                                        <li>Status: {row.properties.Status.select?.name}</li>
                                        <li>Hours: {row.properties.Hours.number}</li>
                                        <li>Worked hours: {row.properties["Worked hours"].rollup.number}</li>
                                        <li>Hours left: {row.properties["Hours left"].formula.number}</li>
                                        <li>Timespan: {`${row.properties.Timespan.date?.start} - ${row.properties.Timespan.date?.end}`}</li>
                                    </ul>
                                </li>
                            ))
                        }
                    </ul>
                    </div>
                )
            }
        </div>
    )
}