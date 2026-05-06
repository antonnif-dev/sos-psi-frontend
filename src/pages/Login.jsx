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
    <div
      className="bg-gradient-to-br from-slate-100 via-white to-indigo-50"
      onClick={() => setExpandedPlan(null)}
    >
      <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2">

        {/* Hero / Promo Section */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full px-6 py-8 sm:px-10 lg:px-16 xl:px-20 flex flex-col justify-center space-y-10"
        >
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-center lg:text-left font-extrabold text-indigo-700 leading-tight">
              SOS Organização
            </h1>

            <p className="text-gray-600 text-center lg:text-left text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
              Gerencie pacientes, agendamentos e prontuários de forma segura e intuitiva.
              Aumente sua produtividade e ofereça um atendimento profissional.
            </p>
          </div>

          {/* Plans Section */}
          <div className="flex flex-row justify-center gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                layout
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedPlan(expandedPlan === plan.id ? null : plan.id);
                }}
                className={`cursor-pointer p-6 rounded-3xl shadow-lg border ${plan.color} transition-all hover:shadow-2xl hover:scale-105 flex-1 max-w-sm flex flex-col`}
              >
                <h3
                  className={`text-2xl font-bold ${plan.id === "pro" ? "text-white" : "text-gray-800"
                    }`}
                >
                  {plan.name}
                </h3>

                <p
                  className={`mt-2 font-semibold text-2xl ${plan.id === "pro"
                    ? "text-white"
                    : "text-indigo-600"
                    }`}
                >
                  {plan.price}
                </p>

                <AnimatePresence>
                  {expandedPlan === plan.id && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`mt-4 space-y-2 overflow-hidden ${plan.id === "pro"
                        ? "text-indigo-100"
                        : "text-gray-700"
                        }`}
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
          <div className="grid grid-cols-1 items-center gap-4">
            {[
              "Agenda inteligente com notificações",
              "Prontuários digitais seguros",
              "Relatórios de evolução detalhados",
              "Chat interno com pacientes",
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{
                  opacity: 0,
                  y: 40,
                  scale: 0.92,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  delay: idx * 0.2,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -6,
                  boxShadow: "0px 0px 25px rgba(99,102,241,0.35)",
                }}
                whileTap={{
                  y: -6,
                  scale: 1.02,
                  boxShadow: "0px 0px 25px rgba(99,102,241,0.35)",
                }}
                className="bg-white rounded-2xl shadow-md p-4 flex items-start gap-3 cursor-pointer transition-all"
              >
                <motion.span
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 1.05 }}
                  className="text-indigo-600 text-2xl"
                >
                  ✔️
                </motion.span>

                <p className="text-gray-700 text-sm sm:text-base font-medium">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Right Column */}
        <section className="w-full flex flex-col justify-around px-6 space-y-10 sm:px-10 lg:px-12 bg-white shadow-inner">

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 sm:p-1"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Entrar
            </h2>

            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
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

          {/* Contact Section */}
          <div className="max-w-md mx-auto w-full bg-slate-50 rounded-3xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center lg:text-left">
              Fale Conosco
            </h3>

            <div className="space-y-3 text-gray-600 text-sm sm:text-base">
              <p>📧 contato@empresa.com.br</p>
              <p>📱 (31) 00000-0000</p>
              <p>
                Atendimento de segunda a sexta, das 8h às 18h.
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
        <div className="space-y-2 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} SOS Organização. Todos os direitos reservados.
          </p>
          <p>
            Desenvolvido por Antonni Dev
          </p>
          <p>
            Política de Privacidade | Termos de Uso
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Login;