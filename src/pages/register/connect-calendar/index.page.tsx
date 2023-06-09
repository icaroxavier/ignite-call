import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { ArrowRight, Check } from 'phosphor-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function ConnectCalendarPage() {
  const router = useRouter()
  const { status } = useSession()

  const isAuthenticated = status === 'authenticated'
  const hasAuthError = router.query.error === 'permissions'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos á medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isAuthenticated ? (
            <Button size={'sm'} disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant={'secondary'}
              size={'sm'}
              onClick={handleConnectCalendar}
            >
              Conectar <ArrowRight />
            </Button>
          )}
        </ConnectItem>
        {hasAuthError && (
          <AuthError>
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </AuthError>
        )}
        <Button type="submit" disabled={!isAuthenticated}>
          Próximo passo <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
