import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import $ from "jquery";

const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function(xhr, status, error){
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    })
}

const handleError = (message) => {
    $("#errorMessage").text(message);
    $("#domoMessage").animate({width:'toggle'},350);
};


const handleDomo = (e) => {
    e.preventDefault();
    $("#domoMessage").animate({ width: 'hide' }, 350);

    console.dir($("#minutes").val());
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
            {console.dir("this " + props.csrf)}
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

    const domoNodes = props.domos.map(function (domo) {
        return (
            <div key={domo._id} className="domo">
                <h3 className="domoName"> Name: {domo.name} </h3>
                <h3 className="domoAge"> Age: {domo.age} </h3>
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
    const data = [
        { x: 0, y: 8 },
        { x: 1, y: 5 },
        { x: 2, y: 4 },
        { x: 3, y: 9 },
        { x: 4, y: 1 },
        { x: 5, y: 7 },
        { x: 6, y: 6 },
        { x: 7, y: 3 },
        { x: 8, y: 2 },
        { x: 9, y: 0 }
    ];

    return (
        <XYPlot height={300} width={300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries data={data} />
        </XYPlot>
    );

}

const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />,
            document.querySelector("#domos")
        );
    });
};

const setup = function (csrf) {
    console.dir(csrf);
    ReactDOM.render(
        <DomoForm csrf={csrf} />,
        document.querySelector("#makeDomo")
    );

    ReactDOM.render(
        <Graph />,
        document.querySelector("#vis")
    )

    ReactDOM.render(
        <DomoList domos={[]} />,
        document.querySelector("#domos")
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