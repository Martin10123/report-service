import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AuthLayout, AuthCard } from '@/components/layout';
import { ROUTES } from '@/constants';
import {
  signUp,
  signInWithGoogle,
  type AuthError,
} from '@/services/supabase';
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import registerImg from '@/images/register-img.svg';

const registerSchema = z
  .object({
    fullName: z.string().min(1, 'El nombre es obligatorio').max(100, 'Nombre demasiado largo'),
    email: z.string().min(1, 'El correo es obligatorio').email('Correo no válido'),
    password: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
      .regex(/[a-z]/, 'Debe contener al menos una minúscula')
      .regex(/[0-9]/, 'Debe contener al menos un número'),
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

function getAuthErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    const msg = (error as AuthError).message;
    if (msg.includes('already registered') || msg.includes('User already registered')) {
      return 'Ya existe una cuenta con este correo. Inicia sesión o recupera tu contraseña.';
    }
    if (msg.includes('Password should be at least')) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    return msg;
  }
  return 'Error al crear la cuenta. Intenta de nuevo.';
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailConfirmationSent, setEmailConfirmationSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const signUpMutation = useMutation({
    mutationFn: ({ fullName, email, password }: RegisterFormData) =>
      signUp(email, password, { fullName }),
    onSuccess: (data) => {
      // Si confirmación de email está desactivada en Supabase, data.session existe y entramos directo.
      // Si está activada, data.session es null y el usuario debe confirmar por correo.
      if (data.session) {
        navigate(ROUTES.DASHBOARD, { replace: true });
      } else {
        setEmailConfirmationSent(true);
      }
    },
  });

  const googleMutation = useMutation({
    mutationFn: () => signInWithGoogle(ROUTES.DASHBOARD),
    onSuccess: (data) => {
      if (data?.url) window.location.href = data.url;
    },
  });

  const onSubmit = handleSubmit((data) => {
    setEmailConfirmationSent(false);
    signUpMutation.mutate(data);
  });

  const onGoogleClick = () => {
    googleMutation.mutate();
  };

  const isPending = signUpMutation.isPending || googleMutation.isPending;
  const errorMessage =
    signUpMutation.error != null
      ? getAuthErrorMessage(signUpMutation.error)
      : null;

  if (emailConfirmationSent) {
    return (
      <AuthLayout imageSrc={registerImg} imageAlt="Crear cuenta" imageOnLeft>
        <AuthCard>
          <div className="space-y-6 animate-in fade-in duration-500 text-center">
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-6 text-green-800">
              <h2 className="text-lg font-semibold">Revisa tu correo</h2>
              <p className="mt-2 text-sm">
                Te enviamos un enlace para confirmar tu cuenta. Haz clic en el
                enlace del correo y luego inicia sesión.
              </p>
            </div>
            <Link
              to={ROUTES.LOGIN}
              className="inline-block text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Ir a iniciar sesión
            </Link>
          </div>
        </AuthCard>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout imageSrc={registerImg} imageAlt="Crear cuenta" imageOnLeft>
      <AuthCard>
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Crear cuenta
            </h1>
            <p className="text-base text-gray-600">
              Completa el formulario para comenzar
            </p>
          </div>

          {errorMessage && (
            <div
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                Nombre completo
              </Label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Tu nombre completo"
                  className="h-11 pl-10 rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-all hover:border-gray-400"
                  autoComplete="name"
                  disabled={isPending}
                  {...register('fullName')}
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Correo electrónico
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  className="h-11 pl-10 rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-all hover:border-gray-400"
                  autoComplete="email"
                  disabled={isPending}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Contraseña
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 8 caracteres"
                  className="h-11 pl-10 pr-10 rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-all hover:border-gray-400"
                  autoComplete="new-password"
                  disabled={isPending}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirmar contraseña
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Repite tu contraseña"
                  className="h-11 pl-10 pr-10 rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 transition-all hover:border-gray-400"
                  autoComplete="new-password"
                  disabled={isPending}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
                  aria-label={
                    showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-blue-600 cursor-pointer font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40 transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-6 disabled:opacity-70"
              disabled={isPending}
            >
              {signUpMutation.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                'Crear cuenta'
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">O regístrate con</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-12 w-full rounded-xl border-2 border-gray-300 bg-white font-semibold cursor-pointer text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
            disabled={isPending}
            onClick={onGoogleClick}
          >
            {googleMutation.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Registrarse con Google
          </Button>

          <p className="text-center text-sm text-gray-600 mt-2">
            ¿Ya tienes cuenta?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline underline-offset-2 transition-colors cursor-pointer"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
