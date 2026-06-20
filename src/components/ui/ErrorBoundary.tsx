"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { KA } from "@/lib/i18n/ka";

interface Props {
  children:  ReactNode;
  fallback?: ReactNode;
  context?:  string;
}

interface State {
  hasError:     boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    // In production this would pipe to Sentry / Datadog RUM
    console.error(`[ErrorBoundary] ${this.props.context ?? "unknown"}:`, error, info);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  override render(): ReactNode {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback)  return this.props.fallback;

    return (
      <div
        role="alert"
        className="flex h-full w-full flex-col items-center justify-center gap-4 p-8"
        style={{ backgroundColor: "var(--color-surface-base)" }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: "rgba(239,68,68,0.1)",
            border:          "1px solid rgba(239,68,68,0.2)",
          }}
        >
          <AlertTriangle size={24} className="text-red-400" />
        </div>

        <div className="text-center">
          <h2 className="text-base font-semibold text-zinc-200">
            {KA.errorTitle}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            {this.props.context === "map" ? KA.errorMapFailed : KA.errorGeneric}
          </p>
          {this.state.errorMessage && (
            <p className="mt-2 rounded-lg bg-red-900/20 px-3 py-1.5 font-mono text-xs text-red-400">
              {this.state.errorMessage}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={this.handleReset}
          className="flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors"
        >
          <RefreshCw size={14} />
          {KA.errorRetry}
        </button>
      </div>
    );
  }
}
