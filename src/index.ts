// import things from 'libraries'
import * as Sentry from '@sentry/node'
import { GraphQLRequestContext } from 'apollo-server-types'
import { config } from 'dotenv'

config()

const sentryPlugin = {
  // request lifecycle events
  requestDidStart(_: GraphQLRequestContext) {
    /* Within this returned object, define functions that respond
           to request-specific lifecycle events. */
    return {
      didEncounterErrors(ctx: GraphQLRequestContext) {
        // If we couldn't parse the operation (usually invalid queries, not necessary?)
        if (!ctx.operation && ctx.errors) {
          for (const err of ctx.errors) {
            Sentry.withScope((scope) => {
              scope.setExtra('query', ctx.request.query)
              Sentry.captureException(err)
            })
          }
          return
        }

        if (ctx.errors) {
          for (const err of ctx.errors) {
            // Add scoped report details and send to Sentry
            Sentry.withScope((scope) => {
              // Annotate whether failing operation was query/mutation/subscription
              if (ctx.operation) {
                scope.setTag('kind', ctx.operation.operation)
              }

              // Log query and variables as extras (make sure to strip out sensitive data!)
              scope.setExtra('query', ctx.request.query)
              scope.setExtra('variables', ctx.request.variables)

              if (err.path) {
                // We can also add the path as breadcrumb
                scope.addBreadcrumb({
                  category: 'query-path',
                  message: err.path.join(' > '),
                  level: Sentry.Severity.Debug,
                })
              }

              const transactionId = ctx.request?.http?.headers.get('x-transaction-id')
              if (transactionId) {
                scope.setTransactionName(transactionId)
              }

              // conditional capture for only prod?
              Sentry.captureException(err)
            })
          }
        }
      },
    }
  },
}

Sentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 1.0, environment: process.env.ENV })

export { sentryPlugin }
export default { sentryPlugin }
