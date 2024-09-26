import { Link } from "react-router-dom";

export default function AdminNavigation() {
    return (
        <>
            <div style={{ minHeight: '100vh', backgroundColor: "#f6f6f6" }}>
                <div style={{ paddingTop: '104px' }}>
                    <ul>
                        <li><Link to={'/admin/categories'}>Categories</Link></li>
                        <li><Link to={'/admin/features'}>Features</Link></li>
                        <li><Link to={'/admin/housings'}>Housings</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}