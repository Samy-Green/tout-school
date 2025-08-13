import { TSButton } from '#components/forms/buttons'
import { TSBasicInput, TSPasswordInput } from '#components/forms/inputs'
import { defaultRegisterFormErrors, RegisterFormErrors } from '#inertia/types/forms/register_form'
import { Head, router, useForm, usePage } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'
import { defaultRegisterFormDatas } from '../../types/forms/register_form'
interface Props {
  configData: any
  errors: RegisterFormErrors | undefined
}

export default function CreateAccount(props: Props) {
  const { configData } = props
  let errors = props.errors || defaultRegisterFormErrors

  const page = usePage()
  const [processing, setProcessing] = useState(false)
  const { data, setData } = useForm(defaultRegisterFormDatas)

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    setProcessing(true)

    router.post('/auth/register', data, {
      preserveScroll: true,
      onSuccess: (page) => {
        // Exécuté quand la requête réussit (statut 2xx)
        console.log('Réponse réussie:', page.props)
      },
      onError: (errors) => {
        // Exécuté quand il y a des erreurs de validation
        console.log('Erreurs:', errors)
      },
      onFinish: (e) => {
        setProcessing(false)
      },
    })
  }

  return (
    <>
      <Head title="Initialisation" />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
        {/* Left side - Illustration */}
        <div className="hidden bg-primary/5 lg:flex lg:w-7/12 relative">
          {/* <div className="w-full g-gradient-to-br from-primary to-bprimary/80 flex items-center justify-center relative overflow-hidden"> */}
          <div className="w-full bg-transparent flex items-center justify-center relative overflow-hidden">
            {/* Background decoration */}
            {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div> */}

            {/* Illustration content */}
            {/* <div className="relative z-10 text-center text-white p-12">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9L10 10L14 10L21 9ZM11 16L14 16V21C14 21.6 13.6 22 13 22L11 22C10.4 22 10 21.6 10 21V16H11Z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">Bienvenue sur {appName}</h1>
              <p className="text-lg text-white/90 max-w-md mx-auto">
                Votre solution complète de gestion scolaire moderne et intuitive
              </p>

              {/ * Decorative elements * /}
              <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full"></div>
              <div className="absolute top-32 right-32 w-3 h-3 bg-white/20 rounded-full"></div>
              <div className="absolute bottom-40 left-16 w-4 h-4 bg-white/25 rounded-full"></div>
              <div className="absolute bottom-24 right-24 w-2 h-2 bg-white/30 rounded-full"></div>
            </div> */}
            <div className="p-0 hidden lg:flex lg:col-span-7">
              <div className="bg-transparent flex justify-center items-center relative">
                <img
                  src={`/assets/img/illustrations/auth-register-illustration-${configData.style}.png`}
                  alt="auth-register-cover"
                  className="my-5 max-w-[60%] h-auto"
                  data-app-light-img="illustrations/auth-register-illustration-light.png"
                  data-app-dark-img="illustrations/auth-register-illustration-dark.png"
                />
                {/* <img
                  src={`/assets/img/illustrations/bg-shape-image-${configData.style}.png`}
                  alt="auth-register-background"
                  className="absolute inset-0 w-full h-full object-cover"
                  data-app-light-img="illustrations/bg-shape-image-light.png"
                  data-app-dark-img="illustrations/bg-shape-image-dark.png"
                /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-5/12 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <img src={configData.appLogo} alt={configData.appName} className="h-12 w-auto" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Initialisation du compte superadmin
              </h2>
              <p className="text-gray-600 mb-4">Créez le premier compte superadmin</p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p>
                  <strong>Note :</strong> Ce compte est le seul que vous pourriez créer ainsi. Le
                  reste étant ajouté par un utilisateur authentifié.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="space-y-6">
              {/* Nom */}
              <TSBasicInput
                label="Login"
                value={data.login}
                error={errors.login}
                placeholder="kafka.123"
                required
                type="text"
                name="login"
                id="login"
                setValue={(value: string) => setData('login', value)}
              />

              <TSBasicInput
                label="Nom"
                value={data.last_name}
                error={errors.last_name}
                placeholder="Kafka"
                required
                type="text"
                name="last_name"
                id="last_name"
                setValue={(value: string) => setData('last_name', value)}
              />

              <TSBasicInput
                label="Prénom"
                value={data.first_name}
                error={errors.first_name}
                placeholder="Ibino"
                required
                type="text"
                name="first_name"
                id="first_name"
                setValue={(value: string) => setData('first_name', value)}
              />

              <TSBasicInput
                label="Email"
                value={data.email}
                error={errors.email}
                placeholder="admin@toutschool.cm"
                required
                type="email"
                name="email"
                id="email"
                setValue={(value: string) => setData('email', value)}
              />

              <TSBasicInput
                label="Téléphone"
                value={data.phone}
                error={errors.phone}
                placeholder="677889900"
                required
                type="tel"
                name="phone"
                id="phone"
                setValue={(value: string) => setData('phone', value)}
              />

              {/* Mot de passe */}
              <TSPasswordInput
                id="password"
                name="password"
                label="Mot de passe"
                value={data.password}
                setValue={(val) => setData('password', val)}
                placeholder="••••••••••••"
                required
                error={errors.password}
              />

              {/* Confirmation mot de passe */}
              <TSPasswordInput
                id="password_confirmation"
                name="password_confirmation"
                label="Confirmer le mot de passe"
                value={data.password_confirmation}
                setValue={(val) => setData('password_confirmation', val)}
                placeholder="••••••••••••"
                required
                error={errors.password_confirmation}
              />

              {/* Submit button */}
              <TSButton
                type="submit"
                color="primary"
                disabled={processing}
                className="w-full flex justify-center"
              >
                {processing ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Création en cours...
                  </div>
                ) : (
                  "S'inscrire"
                )}
              </TSButton>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
