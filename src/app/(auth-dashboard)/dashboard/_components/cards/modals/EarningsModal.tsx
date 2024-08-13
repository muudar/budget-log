'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ArrowUpRight } from 'lucide-react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { getCategories } from '@/actions/categories';
import AddCategoryModal from './AddCategoryModal';
import { Textarea } from '@/components/ui/textarea';
import { set } from 'date-fns';
import toast from 'react-hot-toast';
import { addEarningsRecord } from '@/actions/transactions';

type Props = {
  currentBalance: number;
  currentSavings: number;
};

// TODO: Create form data type for this form
type FormData = any;

//TODO: Create category type
type Category = any;

//TODO: Add Server action for adding earning record
//TODO: handle emoji for server action (create emoji state)
const EarningsModal = ({ currentBalance, currentSavings }: Props) => {
  const [open, setOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [categories, setCategories]: Category[] = useState([]);
  const [data, setData] = useState<FormData>({
    amount: 0,
    pickedCategory: null,
    description: '',
  });
  console.log(data);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      if (res.ok && res.data) {
        setCategories(res.data);
      }
    };
    fetchCategories();
  }, [categoryModalOpen]);
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        toast.loading('Creating record', {
          id: 'loading',
        });
        e.preventDefault();
        const res = await addEarningsRecord(data);
        if (res.ok) {
          toast.success(res.message);
          setOpen(false);
        }
        if (!res.ok) {
          toast.error(res.message || 'Internal server error');
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Internal server error'
        );
        console.error(error);
      } finally {
        toast.remove('loading');
      }
    },
    [data]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="b-1 cursor-pointer rounded-md border bg-white p-1 hover:bg-slate-200">
          <ArrowUpRight />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Earnings</DialogTitle>
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Add Earnings Record</CardTitle>
              <CardDescription>
                Here you can log your earnings such as wage, investments, sales,
                etc ...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <Label htmlFor="currentBalance">Current Balance</Label>
                <Input defaultValue={currentBalance} disabled />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="transferAmount">Earnings Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min={0.01}
                    onChange={(e) =>
                      setData({ ...data, amount: Number(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="transferAmount">Category</Label>
                  <Select
                    onValueChange={(e: string) =>
                      setData({ ...data, pickedCategory: e })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {categories.length > 0 ? (
                          categories.map((category: Category) => (
                            <SelectItem
                              key={category.name}
                              value={category.name}
                            >
                              {category.emoji + ' ' + category.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="m-2 flex justify-center text-sm">
                            No categories found
                          </div>
                        )}
                        <AddCategoryModal
                          open={categoryModalOpen}
                          setOpen={setCategoryModalOpen}
                        ></AddCategoryModal>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="transferAmount">Description</Label>
                  <Textarea
                    id="description"
                    onChange={(e) =>
                      setData({ ...data, description: e.target.value })
                    }
                  ></Textarea>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Add Record</Button>
            </CardFooter>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EarningsModal;
