import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import { botsAPI } from '../api/client';

interface BotDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  bot?: {
    id: number;
    name: string;
    pair: string;
    strategy_id?: number;
    status: string;
    config?: any;
  } | null;
}

const TRADING_PAIRS = [
  'BTC/USDT',
  'ETH/USDT',
  'BNB/USDT',
  'SOL/USDT',
  'ADA/USDT',
  'DOT/USDT',
  'MATIC/USDT',
  'LINK/USDT',
  'UNI/USDT',
  'AVAX/USDT',
];

export const BotDialog: React.FC<BotDialogProps> = ({ open, onClose, onSuccess, bot }) => {
  const [formData, setFormData] = useState({
    name: '',
    pair: 'BTC/USDT',
    strategy_id: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bot) {
      setFormData({
        name: bot.name,
        pair: bot.pair,
        strategy_id: bot.strategy_id?.toString() || '',
      });
    } else {
      setFormData({
        name: '',
        pair: 'BTC/USDT',
        strategy_id: '',
      });
    }
    setError('');
  }, [bot, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        name: formData.name,
        pair: formData.pair,
        strategy_id: formData.strategy_id ? parseInt(formData.strategy_id) : undefined,
      };

      if (bot) {
        await botsAPI.update(bot.id, payload);
      } else {
        await botsAPI.create(payload);
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{bot ? 'Edit Trading Bot' : 'Create New Trading Bot'}</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bot Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., BTC Scalper"
                helperText="Give your bot a descriptive name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Trading Pair"
                name="pair"
                value={formData.pair}
                onChange={handleChange}
                required
                helperText="Select the cryptocurrency pair to trade"
              >
                {TRADING_PAIRS.map((pair) => (
                  <MenuItem key={pair} value={pair}>
                    {pair}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Strategy ID (Optional)"
                name="strategy_id"
                type="number"
                value={formData.strategy_id}
                onChange={handleChange}
                placeholder="Leave empty for default strategy"
                helperText="Link to a specific trading strategy"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : bot ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
