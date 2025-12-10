import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: "active" | "expired" | "expiring"
  children: React.ReactNode
  className?: string
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  const statusClasses = {
    active: "status-active",
    expired: "status-expired",
    expiring: "status-expiring",
  }

  return (
    <Badge 
      variant="outline" 
      className={cn(statusClasses[status], className)}
    >
      {children}
    </Badge>
  )
}