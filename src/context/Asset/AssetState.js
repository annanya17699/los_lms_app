import React from "react";
import AssetContext from "./AssetContext";

function AssetState(props) {
    const assetType = ['Asset', 'Collateral'];
    const frequency = ['Monthly', 'Quarterly', 'Semi-Annually', 'Annually'];

    const assetstructure = {
        loantenure : 0, frequency : 0, type : '', description : '', loanamount : 0, category : ''
    };
    return (
        <AssetContext.Provider
            value={{
                assetstructure, assetType, frequency
            }}
        >
            {props.children}
        </AssetContext.Provider>
    );
}

export default AssetState;
