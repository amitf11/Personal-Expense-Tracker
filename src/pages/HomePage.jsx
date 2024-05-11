import { ExpenseIndex } from "../cmps/ExpenseIndex";

export function HomePage() {
    return (
        <section className="homepage">
            <h1>Hello from Homepage</h1>
            <ExpenseIndex />
        </section>
    )
}