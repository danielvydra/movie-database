import {useParams} from "react-router-dom";

function MovieDetail() {
    const a = useParams();

    return (
        <div>
            Movie detail
            <div>{a.movieID}</div>
        </div>
    );
}

export default MovieDetail;