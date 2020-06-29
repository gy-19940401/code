import React from 'react'
function detail(props) {
    console.log(props.data);
    let local = localStorage.getItem("goal");
    local=JSON.parse(local)
    // console.log("aaa")
    return (<div className="modify">
        <input id="dtl" type="text" placeholder={local[props.data].goal}/>
        <button onClick={subm}>确认修改</button>
    </div>)
    function subm() {
        let div = document.querySelector(".modify");
        let input = document.querySelector("#dtl");
        local[props.data].goal = input.value;
        // console.log(local[props.data].goal);
        localStorage.setItem("goal", JSON.stringify(local))
        div.style.display="none"
        window.location.reload(true);  
    }
}
export default detail;