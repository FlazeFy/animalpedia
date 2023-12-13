export default function GetNavbar({active, subactive}) {
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
                <li><a className={"nav-link " + getActive(active,"stats")} href="/stats">Stats</a></li>
                <li>
                    <a className={"nav-link mb-2 " + getActive(active,"manage")} data-bs-toggle="collapse" href="#collapseManage">Manage</a>
                    <div className="collapse" id="collapseManage">
                        <a className={"nav-link sub mb-2 " + getActive(subactive,"manage_book")} href="/manage_book">Manage Book</a>
                        <a className={"nav-link sub mb-2 " + getActive(subactive,"manage_news")} href="/manage_news">Manage News</a>
                    </div>
                </li>
            </ul>
            <i className="fa-solid fa-bars mobile-nav-toggle" title="Open NavBar"></i>
        </nav>
    )
}