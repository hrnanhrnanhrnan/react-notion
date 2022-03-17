import React from "react";
import Select from "react-select"

export const GetDataComponent = (props) => {
    //Gets data from the parent GetDataContainer through props 
    //and then uses that data to display it to the screen when it is mounted

    return (
        <div className="App container-fluid bg-dark text-white" id="projectmenu">
            {
              props.isLoading ? (
                    <>
                        <div className="spinner-border text-muted">
                        </div>
                        <p>{props.error}</p>
                    </>
                ) : (
                    <div >
                    <h1 className="display-6">Select Project</h1>
                    <Select options = {props.options} onChange={props.handleChange} className=" text-dark position-top" />
                    <ul>
                        {
                            props.showProject.map((row) => (
                                <li key={row.id + 1} className="pt-3">{row.properties.Projectname.title[0].text.content}
                                    <ul key={row.id + 2}>
                                        <li key={row.id + 3}>Status: {row.properties.Status.select?.name}</li>
                                        <li key={row.id + 4}>Hours: {row.properties.Hours.number}</li>
                                        <li key={row.id + 5}>Worked hours: {row.properties["Worked hours"].rollup.number}</li>
                                        <li key={row.id + 6}>Hours left: {row.properties["Hours left"].formula.number}</li>
                                        <li key={row.id + 7}>Timespan: {`${row.properties.Timespan.date?.start} - ${row.properties.Timespan.date?.end}`}</li>
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