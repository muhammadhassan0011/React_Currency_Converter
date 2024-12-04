import ConverterForm from "./Components/ConverterForm";
import Header from "./Components/Header";
// Array of currency codes

export default function App() {
  return (
    <div className="currency-converter">
      <Header />
      <ConverterForm />
    </div>
  );
}
