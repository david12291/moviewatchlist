import { Outlet } from "@remix-run/react";


function Posts() {
    return(
        <>
            
            <Outlet />
        </>
    )

}
export default Posts

//It just works. Post on browser will work now. simply by creating the function and writing in the return 
// You  can even nest the links look at routes folder along with posts folder
//[shows posts from main route or parent route " New Post"]