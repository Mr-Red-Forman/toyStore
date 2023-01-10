
export function HomePage(){

    const imgUrl = 'welcom_page.jpg'
    return(
        <section className="homePage main-layout flex justify-center align-center flex-column">
            <h1>welcome home</h1>
            <h2> Your favorite toys are here</h2>

            <img src={require(`../assets/img/${imgUrl}`)} alt="grampa" />
        </section>

    )
}