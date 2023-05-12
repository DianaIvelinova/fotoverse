import Footer from "@fotoverse/components/Footer";
import Header from "@fotoverse/components/Header";

export default function home() {
    return (
        <div className="d-flex">
            <Header/>
            <div><img className="friendsPfp" alt="" src="./icon.svg"/></div>
            <Footer/>
        </div>
    ) 
}