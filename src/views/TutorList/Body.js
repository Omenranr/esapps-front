import React, {useState, useEffect} from 'react'
import { Classroom } from "./views"
import { connect } from "react-redux"
import { PropTypes } from "prop-types";


const Body = () => {
    //javascript code
    const [formState, setFormState] = useState({
        classroom: "",
        classrooms: []
    })

    useEffect(() => {

    }, )

    const handleChange = (event) => {
        event.persist()

        setFormState(formState => ({
            ...formState,
            [event.target.name]: event.target.value
        }))
    }

    const getClassroom = (event) => {
        event.preventDefault()
        console.log("get classroom button clicked", formState.classroom)
    }

    return (
        //jsxcode
        <div>
            <form>
                <input 
                    type="text" 
                    name="classroom"
                    placeholder="classroom name"
                    value={formState.classroom}
                    onChange={handleChange}
                />
                <button onClick={getClassroom}>
                    Search
                </button>
            </form>
            <Classroom/>
        </div>
    )
}

const mapStateToProps = state => ({
    loadClass: PropTypes.func.isRequired,
})

export default connect(mapStateToProps, {loadClass})(Classroom)