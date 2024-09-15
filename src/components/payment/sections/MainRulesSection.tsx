import '../../../styles/payment/sections/main-rules-section.scss'

export default function MainRulesSection() {
    return (
        <section className="main-rules-section">
            <h2 className="main-rules-section__header">Основні правила</h2>
            <p className="list-header">Ми просимо всіх мандрівників пам’ятати кілька простих правил належної поведінки гостя.</p>
            <ul className="main-rules-list"> 
                <li>Дотримуйтеся правил дому</li>
                <li>Ставтеся до помешкання господаря як до власної оселі</li>
            </ul>
        </section>
    )
}