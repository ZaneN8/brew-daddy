import React from "react";

const CoffeeDesc = ({coffee}) => {

    let desc_str = `${coffee.description}`

    var chunks = desc_str.split(/\s+/).reduce(function(prev, curr) {
        if (prev.length && (prev[prev.length - 1] + ' ' + curr).length <= 250) {
            prev[prev.length - 1] += ' ' + curr;
        }
        else {
            prev.push(curr);
        }
        return prev;
    }, []);

let truncated_desc=chunks[0]

    return (truncated_desc)
}

export default CoffeeDesc