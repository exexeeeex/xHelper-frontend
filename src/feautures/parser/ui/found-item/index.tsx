import type { UserParseResponse } from '@/entities/user/models';
import { Badge, Card, Code, DataList } from '@radix-ui/themes';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
    user: UserParseResponse;
};

export const ParserFoundItem: FC<Props> = ({ user }) => (
    <Card style={{ backgroundColor: 'var(--gray-3)' }} key={user.userId}>
        <DataList.Root>
            <DataList.Item align={'center'}>
                <DataList.Label>Status</DataList.Label>
                <DataList.Value>
                    <Badge color={user.found ? 'jade' : 'red'}>
                        {user.found ? 'Аккаунт найден' : 'Аккаунт не найден'}
                    </Badge>
                </DataList.Value>
            </DataList.Item>
            {user.username && (
                <DataList.Item>
                    <DataList.Label>Username</DataList.Label>

                    <DataList.Value>
                        <Code>
                            <Link
                                target='_blank'
                                to={`https://t.me/${user.username}`}
                            >
                                @{user.username}
                            </Link>
                        </Code>
                    </DataList.Value>
                </DataList.Item>
            )}
            <DataList.Item>
                <DataList.Label>Phone Number</DataList.Label>
                <DataList.Value>{user.phoneNumber}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
                <DataList.Label>UserId</DataList.Label>
                <DataList.Value>{user.userId}</DataList.Value>
            </DataList.Item>
        </DataList.Root>
    </Card>
);
