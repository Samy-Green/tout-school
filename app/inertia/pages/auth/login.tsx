import TSAlert, { FlashProps } from '#components/alerts/alert'
import { TSButton } from '#components/forms/buttons'
import { TSBasicInput, TSPasswordInput } from '#components/forms/inputs'
import { defaultLoginFormErrors, LoginFormErrors } from '#inertia/types/forms/login_form'
import { Head, router, useForm } from '@inertiajs/react'
import { FormEventHandler, useState } from 'react'
import { defaultLoginFormDatas } from '../../types/forms/login_form'
interface Props {
  configData: any
  errors: LoginFormErrors | undefined
}

export default function CreateAccount(props: Props) {
  const { configData } = props
  let errors = props.errors || defaultLoginFormErrors

  const [processing, setProcessing] = useState(false)
  const { data, setData } = useForm(defaultLoginFormDatas)

  const [alertMessage, setAlertMessage] = useState<FlashProps | undefined>(undefined)

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    setProcessing(true)

    router.post('/auth/login', data, {
      preserveScroll: true,
      onError: () => {
        setAlertMessage({ error: 'Identifiant ou mot de passe incorrect' })
      },
      onFinish: () => {
        setProcessing(false)
      },
    })
  }

  return (
    <>
      <Head title="Connexion" />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
        {/* Left side - Illustration */}
        <div className="hidden bg-primary/5 lg:flex lg:w-7/12 relative">
          <div className="w-full bg-transparent flex items-center justify-center relative overflow-hidden">
            {/* Illustration content */}
            <div className="p-0 hidden lg:flex lg:col-span-7">
              <div className="bg-transparent flex justify-center items-center relative">
                <img
                  src={`/assets/img/illustrations/auth-register-illustration-${configData.style}.png`}
                  alt="auth-register-cover"
                  className="my-5 max-w-[60%] h-auto"
                  data-app-light-img="illustrations/auth-register-illustration-light.png"
                  data-app-dark-img="illustrations/auth-register-illustration-dark.png"
                />
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

              <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
              <p className="text-gray-600 mb-4">
                Bienvenu à vous, veuillez entrez vos identifiants pour vous connecter à votre compte
              </p>
              {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p>
                  <strong>Note :</strong> Ce compte est le seul que vous pourriez créer ainsi. Le
                  reste étant ajouté par un utilisateur authentifié.
                </p>
              </div> */}
            </div>

            <TSAlert alertMessage={alertMessage} />
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
                    Connexion en cours...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </TSButton>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
