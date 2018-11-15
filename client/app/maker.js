import { XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import $ from "jquery";

const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function (xhr, status, error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    })
}

const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#domoMessage").animate({ width: 'toggle' }, 350);
};


const handleDomo = (e) => {
    e.preventDefault();
    $("#domoMessage").animate({ width: 'hide' }, 350);

    if ($("#exerciseText").val() == '' || $("#minutes").val() == '') {
        handleError("All fields required");
        return false;
    }

    sendAjax('POST', $("#exerciseForm").attr("action"), $("#exerciseForm").serialize(), function () {
        loadDomosFromServer();
    });

    return false;
};

const DomoForm = (props) => {
    return (
        <form id="exerciseForm" onSubmit={handleDomo} name="exerciseForm" action="/maker" method="POST" className="exerciseForm">
            <label htmlFor="name">Exercise: </label>
            <input id="exerciseText" type="text" name="name" placeholder="Exercise Type ie. Run" />
            <label htmlFor="minutes">Time Worked Out: </label>
            <input id="minutes" type="text" name="minutes" placeholder="In minutes" />
            <label htmlFor="day">Date: </label>
            <input id="day" type="date" name="day" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDataSubmit" type="submit" value="Make Domo" />
        </form>
    )
}

const DomoList = function (props) {
    if (props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(function (data) {
        return (
            <div key={data._id} className="dataObj">
                <h3 className="activity"> {data.name} </h3>
                <h3 className="timeof"> {data.minutes} minutes</h3>
                <h3 className="date"> {data.date.substring(0, 10)} </h3>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const Graph = (props) => {
    console.dir(props.data);

    let data = props.data.map(obj => {
        var newObj = {};
        newObj.x = obj.date.substring(5, 10);
        newObj.y = obj.minutes;
        return newObj;
    });

    // create new array to sort data 
    let sortedData = [];
    for (let i = 0; i < data.length; i++) {
        sortedData.push(Object.values(data[i]))
        for(let j = sortedData.length-1;j>=0;j--){
            let curmonth = parseInt(sortedData[j][0].substring(0,2));

            for(let k = 0;k <=j; k++){
                let prevmonth;
                j-k >=0 ? prevmonth = parseInt(sortedData[j-k][0].substring(0,2)) : null;
                
                if(curmonth < prevmonth){
                    let temp = sortedData[j-k];
                    sortedData[j-k] = sortedData[j]
                    sortedData[j] = temp;
                }

                if(curmonth === prevmonth){
                    for(let m = 0; m<= j; m++){
                        let curday = parseInt(sortedData[j][0].substring(3))
                        let prevday;
                        j-m >=0 ? prevday = parseInt(sortedData[j-m][0].substring(3)) : null;
                        if(curday < prevday){
                            let temp = sortedData[j-m];
                            sortedData[j-m] = sortedData[j]
                            sortedData[j] = temp;
                        }
                    }
                    
                }
            }
        }
    }
    for(let n = 0; n < data.length; n++){
        data[n].x = sortedData[n][0];
        data[n].y = sortedData[n][1];
    }
    

    return (
        <XYPlot height={300} width={300} xType={"ordinal"}>
            <VerticalBarSeries data={data} />
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis barWidth={.2} />
            <g transform={`translate(${300 / 2}, ${300 / 2}`}> <text>Day </text></g>
            <YAxis >
                <g transform={"translate(40, 0)"} className="rv-xy-plot__axis__title"><g transform={"translate(16, 6) rotate(-90)"} style={{ textAnchor: "end" }}><text>Length of Workout (minutes)</text></g></g>
            </YAxis>
        </XYPlot>
    );

}

const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {

        ReactDOM.render(
            <Graph data={data.domos} />,
            document.querySelector("#vis")
        )

        ReactDOM.render(
            <DomoList domos={data.domos} />,
            document.querySelector("#data")
        );
    });
};

const setup = function (csrf) {
    ReactDOM.render(
        <DomoForm csrf={csrf} />,
        document.querySelector("#makeDomo")
    );

    ReactDOM.render(
        <Graph data={[]} />,
        document.querySelector("#vis")
    )

    ReactDOM.render(
        <DomoList domos={[]} />,
        document.querySelector("#data")
    );

    loadDomosFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});