import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Ilogin } from "@/types/login";
import { useAuth } from "@/hooks/useAuth";
import { LoginService } from "@/services/loginService";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Ilogin = {
        email: formData.email,
        password: formData.password,
      };

      const { accessToken, refreshToken } = await LoginService(payload);

      //console.log('✅ Login bem-sucedido');
      //console.log('🔐 accessToken:', accessToken);
      //console.log('🔁 refreshToken:', refreshToken);
      login({
        email: formData.email,
        accessToken,
        refreshToken,
      });

      toast({ title: "Login realizado com sucesso!" });
      navigate("/admin/dashboard");
    } catch (error: any) {
      console.error("❌ Erro ao fazer login:", error);
      toast({
        title: "Erro no login",
        description: error.response?.data?.error || "Credenciais inválidas",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-light to-beige flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-wine to-wine-dark rounded-lg flex items-center justify-center">
              <Home className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-wine">REVAN</h1>
              <p className="text-sm text-gray-600">IMOBILIÁRIA</p>
            </div>
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-wine">Fazer Login</CardTitle>
            <p className="text-gray-600">Acesse sua conta para continuar</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@revan.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="123456"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <p><strong>Credenciais de teste:</strong></p>
                <p>E-mail: admin@revan.com</p>
                <p>Senha: 123456</p>
              </div> */}

              {/* <div className="flex items-center justify-between text-sm">
                <a href="#" className="text-wine hover:underline">
                  Esqueceu sua senha?
                </a>
              </div> */}

              <Button
                type="submit"
                className="w-full bg-wine hover:bg-wine-dark"
              >
                Entrar
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                © {new Date().getFullYear()}{" "}
                <a
                  href="https://quedsoftoficial.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wine hover:underline font-medium"
                >
                  QuedSoft
                </a>
                . Todos os direitos reservados.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
