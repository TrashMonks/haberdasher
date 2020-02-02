import React, { useState } from 'react';
import BodyLayout from './BodyLayout.js';
import logo from './haberdasher.png';
import './Haberdasher.css';
import { render } from '@testing-library/react';


const endpoint = "http://localhost:5000/qud-api/"

// API loading example: https://reactjs.org/docs/faq-ajax.html
class Haberdasher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            currentBodyPlan: "Humanoid",
            availableBodyPlans: [],  // load from API endpoint
            bodyPlans: {}  // load from API endpoint
        }

        this.handleBodyPlanSelect = this.handleBodyPlanSelect.bind(this);
    }

    componentDidMount() {
        // fill state with API data
        fetch(endpoint + "anatomies")
            .then(res => res.json())
            .then(
                (result) => {
                    // build list of available anatomies from response
                    let anatomy, bodyPlansList = []
                    for (anatomy in result) {
                        bodyPlansList.push(anatomy);
                    }
                    this.setState({
                        isLoaded: true,
                        availableBodyPlans: bodyPlansList,
                        bodyPlans: result,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleBodyPlanSelect(event) {
        this.setState({currentBodyPlan: event.target.value});
    }

    render() {
        const { error, isLoaded, bodyPlans } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            // return <div>{this.state.availableBodyPlans}</div>
            return (
                <div class="Haberdasher">
                    <img src={logo} alt="logo" class="Haberdasher-logo"/><br />
                    <form>
                        <select onChange={this.handleBodyPlanSelect}>
                            {this.state.availableBodyPlans.map(plan => {
                                return <option value={plan}>{plan}</option>
                            })}
                        </select>
                    </form>
                    <BodyLayout bodyplan={this.state.currentBodyPlan} bodyPlans={this.state.bodyPlans}/>
                </div>
            )
        }
    }
}

export default Haberdasher;
