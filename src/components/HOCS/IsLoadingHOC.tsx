import React, { useState } from "react"
import { LoadingOverlay } from "../shared/LoadingOverlay";

export const IsLoadingHoc = (WrappedComponent: any) => {
    function HOC(props:any) {
        const [isLoading, setLoading] = useState<boolean>(false);

        const setLoadingState = (isComponentLoading: boolean) => {
            setLoading(isComponentLoading)
        }

        return (
            <>
                {isLoading && <LoadingOverlay />}
                <WrappedComponent {...props} setLoading={setLoadingState} />
            </>
        )
    }
    return HOC
}

export default IsLoadingHoc