import React from "react";
import Select from "react-select";

export const AdminComponent = (props) => {
    console.log(props.timereport)
    //SHOW ME WHAT YOU GOT!
    return (
        <div className="container-fluid text-white">
            {
                props.isLoadingUsers && props.isLoadingProjects && props.isLoadingTimereports ? (
                    <>
                        <div className="spinner-border text-muted">
                        </div>
                        <p>{props.error}</p>
                    </>
                ) : (
                    <div>
                    <Select onChange={props.handleProjectChange} options={props.projectOptions} className="text-dark"/>
                    <Select onChange={props.handlePersonChange} options={props.userOptions} className="text-dark"/>
                    <ul>
                        {
                            props.timereport.map((element) => (
                                <>
                                <li>Project Name</li>
                                <ul>
                                    <li key={element.id + 1}>{`${element.properties["Date"].date.start}`}</li>
                                    <li key={element.id + 2}>Hours: {element.properties.Hours.number}</li>
                                    <li key={element.id + 3}>Weeks: {element.properties.Week.number}</li>
                                    <li key={element.id + 4}>Note: {element.properties.Note.title[0].plain_text}</li>
                                </ul>
                                </>
                            ))
                        }
                    </ul>
                    </div>
                )
            }
        </div>
    )
}