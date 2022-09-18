export default function About({ message }) {
    console.log(message);
    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}
    
export function getServerSideProps() {
    return {
        props: { message: "Welcome to the About Page" },
    };
}