import GetBreakLine from "../../components/others/breakLine";

export default function GetDctIntro({ctx, img, items}) {
    return (
        <>
            <GetBreakLine length={4}/>
            <div className='mt-4 text-center' id={ctx}>
                <h1 style={{fontSize:"var(--textXJumbo)"}}>{ctx}</h1>
                <img className="img img-fluid mb-3" src={img} style={{maxWidth:"30%", minWidth:"300px"}}/>
                <GetBreakLine length={2}/>
                {
                    items.map((val, i, idx) => {
                        return (
                            <>
                                <a className="btn btn-primary rounded-pill me-2 px-4 py-3" style={{fontWeight:"500"}}>{val}</a>
                            </>
                        )
                    })
                }
            </div>
            <GetBreakLine length={5}/>
        </>
    )
}