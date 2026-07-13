import "./Barcode.scss";

interface BarcodeProps {
    value: string;
}

export const Barcode = ({ value }: BarcodeProps) => {
    
    // Функція, яка генерує масив ліній на основі тексту
    const generateBarcodeLines = () => {
        const lines = [];
        // Якщо інпут порожній, покажемо базовий шаблон
        const textToEncode = value || "MEGAMARKET"; 
        
        // Робимо фіксовану кількість ліній (наприклад, 45), щоб штрих-код мав стабільну ширину
        for (let i = 0; i < 45; i++) {
            // Беремо ASCII код символу. Магічний оператор % допомагає ходити по колу рядка, якщо він коротший за 45
            const charCode = textToEncode.charCodeAt(i % textToEncode.length) || 65;
            
            // На основі математики символу вираховуємо:
            // 1. Товщину лінії (1px, 2px або 4px)
            const thickness = ((charCode + i) % 5 === 0) ? 4 : ((charCode + i) % 2 === 0) ? 2 : 1;
            // 2. Відступ до наступної лінії (від 1px до 3px)
            const gap = (charCode * i) % 3 + 1;
            // 3. Інколи робимо лінії білими (пропуск), щоб штрих-код не був занадто густим
            const isWhite = (charCode + i) % 7 === 0;

            lines.push(
                <div
                    key={i}
                    className="barcode-line"
                    style={{
                        width: `${thickness}px`,
                        marginRight: `${gap}px`,
                        backgroundColor: isWhite ? "transparent" : "#000000"
                    }}
                />
            );
        }
        return lines;
    };

    return (
        <div className="barcode-container">
            <div className="barcode-lines-wrapper">
                {generateBarcodeLines()}
            </div>
            <p className="barcode-text">{value || "PRICE CHECKER"}</p>
        </div>
    );
};