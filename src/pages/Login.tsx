import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Ilogin } from "@/types/login";
import { useAuth } from "@/hooks/useAuth";
import { LoginService } from "@/services/loginService";
import logo from "@/assets/Logo Revan Vinho.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: Ilogin = {
        email: formData.email,
        password: formData.password,
      };
      const { accessToken, refreshToken } = await LoginService(payload);

      login({ email: formData.email, accessToken, refreshToken });
      toast({ title: "Login realizado com sucesso!" });
      navigate("/admin/dashboard");
    } catch (error: any) {
      console.error("❌ Erro ao fazer login:", error);
      toast({
        title: "Erro no login",
        description: error.response?.data?.error || "Credenciais inválidas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-beige-light to-beige px-4">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <img
          src={logo}
          alt="Logo Revan"
          className="w-48 h-auto object-contain"
        />

        <Card className="w-full shadow-xl border-0">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl text-wine">Fazer Login</CardTitle>
            <p className="text-gray-600 text-sm">
              Acesse sua conta para continuar
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@revan.com"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
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

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-wine hover:bg-wine-dark"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Entrar
              </Button>
            </form>

            <div className="text-center pt-2">
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
