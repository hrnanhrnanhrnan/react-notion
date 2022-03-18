import React from "react";
import { AdminComponent } from "../components/AdminComponent"
import { useFetch } from "../customHooks/UseFetch";

export const AdminContainer = () => {
    const userOptions = []
    const projectOptions = []
    const {data: users, isLoading: loadingUsers, error: usersError} = useFetch("/get_members")
    const {data: projects, isLoading: loadingProjects, error: projectsError} = useFetch("/get_projects")
    const {data: timereports, isLoading: loadingTimereports, error: timereportsError} = useFetch("/get_timereports")

    !loadingUsers && (() => {
        users.results.map((users) => userOptions.push({value: users.id, label: users.properties.Name.title[0].plain_text}))
    })()

    !loadingProjects && (() => {
        projects.results.map((projects) => projectOptions.push({value: projects.id, label: projects.properties.Projectname.title[0].plain_text}))
    })()

    if(!loadingProjects && !loadingUsers && !loadingTimereports){
        console.log(users)
        console.log(projects)
        console.log(timereports)
    }

    // useEffect(() => {
    //     Promise.all([
    //         fetch("/get_people").then(res => res.json()),
    //         fetch("/get_database").then(res => res.json())
    //         ]).then(([users, projects]) => {
    //             setProjectData(projects)
    //             setUserData(users)
    //         })
    //     }, []
    // )

    //LOGIK
    return (
        <AdminComponent projectOptions={projectOptions} userOptions={userOptions} />
    )
}