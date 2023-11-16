export default function GetNavbar({active}) {
    function getActive(val, curr){
        if(val == curr){
            return "active";
        } else {
            return "";
        }
    }

    return  (
        <nav id="navbar" className="navbar">
            <ul>
                <li><a className={"nav-link " + getActive(active,"home")} href="/">Home</a></li>
                <li><a className={"nav-link " + getActive(active,"book")} href="/book">Book</a></li>
                <li><a className={"nav-link " + getActive(active,"news")} href="/news">News</a></li>
                <li><a className={"nav-link " + getActive(active,"manage")} href="/manage">Manage</a></li>
            </ul>
            <i className="fa-solid fa-bars mobile-nav-toggle" title="Open NavBar"></i>
        </nav>
    )
}