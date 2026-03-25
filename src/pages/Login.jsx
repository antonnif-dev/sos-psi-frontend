import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expandedPlan, setExpandedPlan] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate("/dashboard");
    } catch (err) {
      alert("Erro no login! Verifique suas credenciais.");
    }
  }

  const plans = [
    {
      id: "basic",
      name: "Básico",
      price: "R$ 50/mês",
      features: [
        "1 usuário",
        "Até 10 pacientes",
        "Prontuários digitais",
        "Agenda simples",
      ],
      color: "bg-white text-gray-800 border-gray-200",
    },
    {
      id: "pro",
      name: "Pro",
      price: "R$ 100/mês",
      features: [
        "Usuários ilimitados",
        "Pacientes ilimitados",
        "Prontuários avançados",
        "Agenda inteligente com notificações",
        "Relatórios detalhados",
      ],
      color: "bg-indigo-600 text-white",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      {/* Hero / Promo Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:w-1/2 px-12 py-20 flex flex-col justify-center space-y-8"
      >
        <h1 className="text-5xl font-extrabold text-indigo-700 leading-tight">
          Plataforma completa para psicólogos
        </h1>
        <p className="text-gray-600 text-lg max-w-lg">
          Gerencie pacientes, agendamentos e prontuários de forma segura e intuitiva.
          Aumente sua produtividade e ofereça um atendimento profissional.
        </p>

        {/* Plans Section */}
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              layout
              onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
              className={`cursor-pointer p-6 rounded-3xl shadow-lg border ${plan.color} transition-all hover:shadow-2xl hover:scale-105 flex flex-col`}
            >
              <h3 className={`text-2xl font-bold ${plan.id === "pro" ? "text-white" : "text-gray-800"}`}>
                {plan.name}
              </h3>
              <p className={`mt-2 font-semibold text-2xl ${plan.id === "pro" ? "text-white" : "text-indigo-600"}`}>
                {plan.price}
              </p>

              <AnimatePresence>
                {expandedPlan === plan.id && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`mt-4 space-y-2 ${plan.id === "pro" ? "text-indigo-100" : "text-gray-700"}`}
                  >
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span>✅</span> {feature}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {["Agenda inteligente com notificações", "Prontuários digitais seguros", "Relatórios de evolução detalhados", "Chat interno com pacientes"].map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4"
            >
              <span className="text-indigo-600 text-2xl">✔️</span>
              <p className="text-gray-700">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:w-1/3 w-full max-w-md bg-white rounded-3xl shadow-2xl p-12 mx-6 my-12 flex flex-col"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Entrar</h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            className="border border-gray-300 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border border-gray-300 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-lg">
            Entrar
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;