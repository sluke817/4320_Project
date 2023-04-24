export default function Logout(props) {
    const { setUser } = props;

    return (
        <button onClick={() => setUser('')}>Logout</button>
    )
}
