export default function GetFooter() {
    return  (
        <footer className="footer mt-auto py-3">
            <div className="container-fluid pb-2 py-4 px-4">
                <div className="row text-center">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <h6 className="fw-bold" style={{fontSize:"var(--textJumbo)"}}>Animalpedia</h6>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <p className="text-white">© 2024 FlazeFy, Leo</p>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <a className="text-white text-decoration-none" href="/about">Contact me for collaboration</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}